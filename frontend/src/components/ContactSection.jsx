import { Box, Center, Text, useMantineTheme } from "@mantine/core";

const ContactSection = () => {
	const theme = useMantineTheme();

	return (
		<Box my={100}>
			<Center>
				<Text
					fw="bold"
					fz={44}
					align="center"
					mb="md"
					style={{
						borderBottom: `4px solid ${theme.colors.main[3]}`,
						width: "200px",
					}}
				>
					Contact
				</Text>
			</Center>
			<Text>
				Combine multiple CSV documents in the preferred order and save them as a
				single file. Free online CSV Merger tool without registration is created
				to quickly join multiple files into a single document. Join multiple CSV
				files into one document at high speed. You will not spend your time
				doing these operations manually on desktop software. Our goal is to
				provide you with a reliable solution to optimize your office workflow
				through online CSV Merger application. This CSV Merger tool works for
				all platforms: Windows, Linux, macOS and Android. No desktop software
				installation is required. It's powerful, modern, fast, flexible,
				easy-to-use and completely free.
			</Text>
		</Box>
	);
};

export default ContactSection;
