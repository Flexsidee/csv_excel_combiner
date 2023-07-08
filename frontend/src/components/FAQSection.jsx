import { Accordion, Box, Text, Title } from "@mantine/core";

const FAQSection = () => {
	const faq = [
		{
			id: 1,
			label: "How can I merge files using CSV Document Merger?",
			content:
				"First of all, you need to select and add CSV files for merging by two ways: drag and drop your CSV files to the white area with the label ”Click or drop your file here” or click on this area and then select the desired CSV files using file explorer. Once the files are added, the green progress bar will begin to grow. When the process is completed, you can click the Save button and then download your merged CSV file.",
		},
		{
			id: 2,
			label: "How long does it take to merge CSV files?",
			content:
				"Usually, this CSV Document Merger works fast for small files in seconds.",
		},
		{
			id: 3,
			label: "Is it safe to merge files using our free CSV Document Merger?",
			content:
				"Yes, the download link of merged CSV file will be available only for you. The uploaded files will be ereased after 24 hours and the download link will stop working after this time period. No one has access to your files. The CSV Document Merger is absolutely safe.",
		},
		{
			id: 4,
			label: "Can I merge CSV files on Linux, Mac OS or Android?",
			content:
				"Yes, you can use our free CSV Document Merger on any operating system that has a web browser. Our CSV Document Merger works online and does not require any software installation.",
		},
		{
			id: 5,
			label: "What browser should I use to merge CSV files?",
			content:
				"You can use any modern browser to merge CSV files, for example, Google Chrome, Microsoft Edge, Firefox, Opera, or Safari.",
		},
	];

	return (
		<Box my="xl">
			<Title order={1} align="center" mb="xl">
				Frequently Asked Questions
			</Title>
			<Accordion
				variant="contained"
				defaultValue="How can I merge files using CSV Document Merger?"
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
