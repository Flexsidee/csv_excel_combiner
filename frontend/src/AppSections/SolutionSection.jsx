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
import { modals } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import { IconUpload, IconX, IconFile, IconPlus } from "@tabler/icons-react";

const SolutionSection = () => {
	const addRef = useRef(null);
	const smallScreen = useMediaQuery("(max-width: 568px)");
	const [loading, setLoading] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [downloadFormat, setDownloadFormat] = useState("CSV"); // Default format: CSV

	const showCompleteModal = () =>
		modals.open({
			title: "Files Combined Successfully",
			centered: true,
			children: (
				<Box>
					<Text my="sm" align="center">
						This is to inform you that your files have been merged succesfully
						and the combined file has been downloaded to your device.
					</Text>
					<Button fullWidth color="greey.2" onClick={modals.closeAll} mt="md">
						Close
					</Button>
				</Box>
			),
		});

	const showErrorModal = () => {
		modals.open({
			title: "Server Error",
			centered: true,
			children: (
				<Box>
					<Text my="sm" align="center">
						Oops! There has been an issue with the server. Kindly retry and make
						you sure you have internet connection.
					</Text>
					<Button fullWidth color="greey.2" onClick={modals.closeAll} mt="md">
						Close
					</Button>
				</Box>
			),
		});
	};

	const showRejectModal = () => {
		modals.open({
			title: "File Unacceptable",
			centered: true,
			children: (
				<Box>
					<Text my="sm" align="center">
						Only <strong>.csv</strong> and <strong>.xlsx </strong> files are
						accepted. <br />
						Other file types are unsupported.
					</Text>
					<Button fullWidth color="greey.2" onClick={modals.closeAll} mt="md">
						Close
					</Button>
				</Box>
			),
		});
	};

	const handleMergeFiles = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		for (let file of selectedFiles) {
			formData.append("files[]", file);
		}

		// Append the selected format to the request
		formData.append("format", downloadFormat);

		try {
			setLoading(true);
			const response = await fetch(
				import.meta.env.VITE_USER_NODE_ENV === "development"
					? import.meta.env.local.VITE_APP_API_URL
					: import.meta.env.VITE_API_URL,
				{
					method: "POST",
					body: formData,
				}
			);

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

				setLoading(false);
				setSelectedFiles([]);
				showCompleteModal();
			} else {
				// Handle error response
				const error = await response.text();
				console.error("Error:", error);
				setLoading(false);
				showErrorModal();
			}
		} catch (error) {
			console.error("Error:", error);
			setLoading(false);
			showErrorModal();
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
		<Box id="app" mt={smallScreen ? 50 : 100}>
			<Center>
				<Box style={{ textAlign: "center" }} mb="xl">
					<Text fw="bold" fz={smallScreen ? 30 : 44}>
						CSV and Excel Combiner
					</Text>
					<Text mt="sm" color="grey">
						Combine CSV or/and Excel files from any device.
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
						<Text mt="sm">
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
					onReject={() => showRejectModal()}
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
								minHeight: smallScreen ? rem(160) : rem(260),
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
							style={{
								minHeight: smallScreen ? rem(200) : rem(300),
								pointerEvents: "none",
							}}
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
								<Text
									size={smallScreen ? "md" : "xl"}
									inline
									align={smallScreen ? "center" : "left"}
								>
									Drag csv or excel files here, or click to select files.
								</Text>
								<Text
									size="sm"
									color="dimmed"
									inline
									mt={7}
									align={smallScreen ? "center" : "left"}
								>
									Attach as many files as you like, each file should not exceed.
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
						<Button onClick={handleMergeFiles} loading={loading ? true : false}>
							Merge Now
						</Button>
					</Group>
				)}
			</Box>
		</Box>
	);
};

export default SolutionSection;
