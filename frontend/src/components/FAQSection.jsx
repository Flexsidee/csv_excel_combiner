import { Accordion, Box, Center, Text, useMantineTheme } from "@mantine/core";

const FAQSection = () => {
	const theme = useMantineTheme();
	const faq = [
		{
			id: 6,
			label: "What is the requirement for merging files?",
			content:
				"The files you want to combine or merge should have the same header across all files.",
		},
		{
			id: 7,
			label: "Does CSVExcelCombiner repeats the header for each file added?",
			content:
				"No, the result file has the header only once which is at the begining of the file.",
		},
		{
			id: 1,
			label: "How can I merge files using CSVExcelCombiner?",
			content:
				"First of all, you need to select and add files (either CSV or XLSX files) for merging by two ways: drag and drop your files to the white area with the label ”Click or drop your file here” or click on this area and then select the desired files using file explorer. Once the files are added, a button will appear istructing you to merge the files. When the process is completed, the combine file will be downloaded automatically to your device.",
		},
		{
			id: 2,
			label: "How long does it take to combine files?",
			content:
				"CSVExcelCombiner combines files very fast for small files in seconds.",
		},
		{
			id: 3,
			label: "Is it safe to combine files using CSVExcelCombiner?",
			content:
				"Yes, the downloaded result file is made available only for you. The uploaded files are erased on our server immediately the file is downloaded on your device. No one has access to your files. CSVExcelCombiner is absolutely safe.",
		},
		{
			id: 4,
			label: "Can I merge files on Linux, Mac OS or Android?",
			content:
				"Yes, you can use CSVExcelCombiner on any operating system that has a web browser. CSVExcelCombiner works online and does not require any software installation.",
		},
		{
			id: 5,
			label: "What browser should I use to merge files?",
			content:
				"You can use any modern browser to merge files, for example, Google Chrome, Microsoft Edge, Firefox, Opera, or Safari.",
		},
	];

	return (
		<Box mt={100} id="faq">
			<Center>
				<Text
					fw="bold"
					fz={44}
					align="center"
					mb="md"
					style={{
						borderBottom: `4px solid ${theme.colors.main[3]}`,
						width: "600px",
					}}
				>
					Frequently Asked Questions
				</Text>
			</Center>
			<Accordion
				variant="contained"
				defaultValue="What is the requirement for merging files?"
			>
				{faq.map((item) => (
					<AccordianRow
						key={item.id}
						label={item.label}
						content={item.content}
					/>
				))}
			</Accordion>
		</Box>
	);
};

export default FAQSection;

const AccordianRow = ({ label, content }) => {
	return (
		<Accordion.Item value={label}>
			<Accordion.Control>
				<Text fz={20} fw="bold">
					{label}
				</Text>
			</Accordion.Control>
			<Accordion.Panel>{content}</Accordion.Panel>
		</Accordion.Item>
	);
};
