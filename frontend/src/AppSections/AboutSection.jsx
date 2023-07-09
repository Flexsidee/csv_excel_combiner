import { Box, Center, Text, useMantineTheme } from "@mantine/core";

const AboutSection = () => {
	const theme = useMantineTheme();

	return (
		<Box mt={130} id="about">
			<Center>
				<Text
					fw="bold"
					fz={44}
					align="center"
					mb="md"
					style={{
						borderBottom: `4px solid ${theme.colors.main[3]}`,
						width: "150px",
					}}
				>
					About
				</Text>
			</Center>
			<Text>
				CSVExcelCombiner is a web application that simplifies the process of
				merging and combining CSV (Comma-Separated Values) and Excel files. This
				powerful tool allows users to upload multiple files in either CSV or
				Excel format, and seamlessly merge them into a single consolidated file.{" "}
			</Text>{" "}
			<br />
			<Text>
				With CSVExcelCombiner, users can effortlessly combine data from various
				sources, eliminating the need for manual data manipulation and saving
				valuable time. The application provides a user-friendly interface where
				users can select and upload their files. It supports both CSV and Excel
				formats, ensuring compatibility with different data sources and
				workflows.
			</Text>{" "}
			<br />
			<Text>
				The merging process intelligently handles headers and data, preserving
				the structure of the original files. Users have the flexibility to
				choose the desired output format, whether it's CSV or Excel, based on
				their specific requirements. Once the merging is complete, users can
				conveniently download the merged file directly from the application.
			</Text>
			<br />
			<Text>
				CSVExcelCombiner empowers businesses, researchers, and data analysts by
				simplifying the data integration process. Whether it's consolidating
				sales reports, merging survey responses, or combining data from multiple
				departments, this application provides a reliable and efficient
				solution. Say goodbye to manual data merging and let CSVExcelCombiner
				streamline your data integration tasks.
			</Text>
		</Box>
	);
};

export default AboutSection;
