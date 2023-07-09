import { useRef, useState } from "react";
import {
	Box,
	Button,
	Group,
	Text,
	Select,
	rem,
	ActionIcon,
	Center,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX, IconFile, IconPlus } from "@tabler/icons-react";

const SolutionSection = () => {
	const addRef = useRef(null);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [downloadFormat, setDownloadFormat] = useState("CSV"); // Default format: CSV

	const handleMergeFiles = async (event) => {
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
				alert("done");
			} else {
				// Handle error response
				const error = await response.text();
				console.error("Error:", error);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleRemoveFile = (index) => {
		setSelectedFiles((prevFiles) => {
			const updatedFiles = [...prevFiles];
			updatedFiles.splice(index, 1);
			return updatedFiles;
		});
	};

	return (
		<Box id="app">
			<Center>
				<Box style={{ textAlign: "center" }} mb="xl">
					<Text fw="bold" fz={44}>
						CSV and Excel Combiner
					</Text>
					<Text mt="sm" color="grey">
						Combine CSV or/and Excel files from any device with any browser.
					</Text>
					<Text color="grey" mb="sm">
						Developed by{" "}
						<Text
							component="a"
							href="https://somadedaniel.netlify.app/"
							color="blue"
						>
							Daniel Somade.
						</Text>
					</Text>
				</Box>
			</Center>
			<Box>
				{selectedFiles.length > 0 && (
					<Box
						py="sm"
						px="lg"
						mb="sm"
						style={{
							borderRadius: "4px",
							border: "2px solid #14B8FF",
							background: "#E1F6FF",
							boxShadow: " 0px 0px 4px 0px rgba(20, 184, 255, 0.50)",
						}}
					>
						<Text fz={16} fw={600} style={{ color: "#0E3465" }}>
							Your file will be downloaded automatically after clicking the
							merge button.
						</Text>
						<Text>
							Default download format is CSV, you can change that using the
							select button beside the merge button.
						</Text>
					</Box>
				)}
				<Dropzone
					openRef={addRef}
					onDrop={(files) =>
						setSelectedFiles((prevFiles) => [...prevFiles, ...files])
					}
					onReject={() => alert("Files Unaccepted")}
					maxSize={3 * 1024 ** 2}
					accept={{
						"text/csv": [".csv"], //Comma-separated values (CSV)
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
							[".xlsx"], //Microsoft Excel (OpenXML) files
					}}
					activateOnClick={selectedFiles.length > 0 ? false : true}
					styles={{ inner: { pointerEvents: "all" } }}
					loading={false}
				>
					{selectedFiles.length > 0 ? (
						<Group
							style={{
								minHeight: rem(260),
							}}
						>
							{selectedFiles.map((file, index) => (
								<Group key={index} spacing={0}>
									<IconFile extension={file.name.split(".").pop()} size={30} />
									<Text style={{ marginLeft: 8 }}>{file.name}</Text>
									<ActionIcon onClick={() => handleRemoveFile(index)}>
										<IconX size={24} stroke={1.5} color="red" />
									</ActionIcon>
								</Group>
							))}
							<Button onClick={() => addRef.current()}>
								<IconPlus size={16} stroke={3} style={{ marginRight: "5" }} />
								Add File
							</Button>
						</Group>
					) : (
						<Group
							position="center"
							spacing="xl"
							style={{ minHeight: rem(300), pointerEvents: "none" }}
						>
							<Dropzone.Accept>
								<IconUpload size="3.2rem" stroke={1.5} color="blue" />
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconX size="3.2rem" stroke={1.5} color="red" />
							</Dropzone.Reject>
							<Dropzone.Idle>
								<IconFile size="3.2rem" stroke={1.5} />
							</Dropzone.Idle>
							<Box>
								<Text size="xl" inline>
									Drag csv or excel files here or click to select files
								</Text>
								<Text size="sm" color="dimmed" inline mt={7}>
									Attach as many files as you like, each file should not exceed
									5mb
								</Text>
							</Box>
						</Group>
					)}
				</Dropzone>
				{selectedFiles.length > 0 && (
					<Group my="md" position="right" align="end">
						<Select
							data={["CSV", "XLSX"]}
							label="Select Download Format"
							placeholder="Select format"
							defaultValue="CSV"
							value={downloadFormat}
							onChange={setDownloadFormat}
						/>
						<Button onClick={handleMergeFiles}>Merge Now</Button>
					</Group>
				)}
			</Box>
		</Box>
	);
};

export default SolutionSection;
