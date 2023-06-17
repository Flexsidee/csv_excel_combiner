import { useState } from "react";

const App = () => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const api = `${import.meta.env.VITE_API_BASE}`;

	const handleFileSelect = (event) => {
		const files = event.target.files;
		const allowedExtensions = ["csv", "xlsx"];
		let validFiles = [];

		// Filter and validate the selected files
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const extension = file.name.split(".").pop().toLowerCase();

			if (allowedExtensions.includes(extension)) {
				validFiles.push(file);
			}
		}

		// Set the selected files state
		setSelectedFiles(validFiles);
	};

	// Function to convert CSV string to a downloadable file
	function downloadCSV(data) {
		const blob = new Blob([data], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "combined_data.csv";
		link.click();
		URL.revokeObjectURL(url);
	}

	// Function to convert XLSX string to a downloadable file
	function downloadXLSX(data) {
		const blob = new Blob([data], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "combined_data.xlsx";
		link.click();
		URL.revokeObjectURL(url);
	}

	const handleSubmit = async () => {
		if (selectedFiles.length > 0) {
			const formData = new FormData();

			selectedFiles.forEach((file) => {
				formData.append("files[]", file);
			});

			await fetch(api, {
				method: "POST",
				body: formData,
			})
				.then((res) => res)
				.then((data) => {
					// Retrieve the response data and content type
					const responseData = data.result;
					const contentType = data.content_type;
					const fileExtension = data.file_extension;

					// Handle the response based on the content type and file extension
					// if (contentType === "text/csv" && fileExtension === "csv") {
					// 	downloadCSV(responseData);
					// } else if (
					// 	contentType ===
					// 		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
					// 	fileExtension === "xlsx"
					// ) {
					// 	downloadXLSX(responseData);
					// } else {
					// 	// Handle unsupported file formats or errors
					// 	alert("Invalid response format or error occurred.");
					// }

					console.log(responseData);
					console.log(contentType);
					console.log(fileExtension);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	};

	return (
		<div>
			<h1>File Upload</h1>
			<input
				type="file"
				multiple
				accept=".csv, .xlsx"
				onChange={handleFileSelect}
			/>
			{selectedFiles.length >= 2 ? (
				<p>Files selected: {selectedFiles.length}</p>
			) : (
				<p>Please select at least two CSV or XLSX files.</p>
			)}
			<button onClick={handleSubmit}>Upload</button>
		</div>
	);
};

export default App;
