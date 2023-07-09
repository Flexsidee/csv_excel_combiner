import { Box, Center, Text, useMantineTheme } from "@mantine/core";

const ContactSection = () => {
	const theme = useMantineTheme();

	return (
		<Box my={100} id="contact">
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
			<Box></Box>
		</Box>
	);
};

export default ContactSection;
