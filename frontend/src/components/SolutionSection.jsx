import { useState } from "react";

const SolutionSection = () => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [downloadFormat, setDownloadFormat] = useState("csv"); // Default format: CSV

	const handleFileChange = (event) => {
		const files = event.target.files;
		setSelectedFiles([...files]);
	};

	const handleFormatChange = (event) => {
		setDownloadFormat(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		for (let file of selectedFiles) {
			formData.append("files[]", file);
		}

		// Append the selected format to the request
		formData.append("format", downloadFormat);

		try {
			const response = await fetch("http://localhost:5000/process_files", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				// Extract the filename from the response headers
				const contentDisposition = response.headers.get("Content-Disposition");
				const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
				const matches = filenameRegex.exec(contentDisposition);
				let filename = `result.${downloadFormat}`;
				if (matches !== null && matches[1]) {
					filename = matches[1].replace(/['"]/g, "");
				}

				// Download the file
				const blob = await response.blob();

				if (window.navigator && window.navigator.msSaveOrOpenBlob) {
					// For IE/Edge browser
					window.navigator.msSaveOrOpenBlob(blob, filename);
				} else {
					// For other browsers
					const url = window.URL.createObjectURL(blob);
					const link = document.createElement("a");
					link.href = url;
					link.download = filename;
					link.click();
					URL.revokeObjectURL(url);
				}
			} else {
				// Handle error response
				const error = await response.text();
				console.error("Error:", error);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div>
			<h1>File Upload</h1>
			<form onSubmit={handleSubmit}>
				<input type="file" multiple onChange={handleFileChange} />
				<select value={downloadFormat} onChange={handleFormatChange}>
					<option value="csv">CSV</option>
					<option value="xlsx">Excel (XLSX)</option>
				</select>
				<button type="submit">Process Files</button>
			</form>
		</div>
	);
};

export default SolutionSection;
