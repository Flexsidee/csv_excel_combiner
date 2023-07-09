import { useState } from "react";
import {
	Box,
	Center,
	Grid,
	Text,
	TextInput,
	Textarea,
	useMantineTheme,
} from "@mantine/core";

const ContactSection = () => {
	const theme = useMantineTheme();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [name, setName] = useState("");

	return (
		<Box mt={150} mb={100} id="contact">
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
			<Text align="center" fw="bold" mb="lg">
				You have a message or comment for the developer? Kindly fill the form
				below.
				<br />
				You can also reach out to the developer by clicking the icons on the
				website footer.
			</Text>
			<Box>
				<Grid>
					<Grid.Col span={6}>
						<TextInput
							label="Your Name"
							placeholder="Enter your name"
							size="lg"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Email Address"
							placeholder="Enter your email address"
							value={email}
							size="lg"
							onChange={(e) => setEmail(e.target.value)}
							withAsterisk
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Textarea
							label="Your Comment"
							placeholder="Your comment"
							autosize
							size="lg"
							minRows={6}
							maxRows={10}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</Grid.Col>
				</Grid>
			</Box>
		</Box>
	);
};

export default ContactSection;
