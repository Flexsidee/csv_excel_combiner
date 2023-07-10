import { useState } from "react";
import {
	Box,
	Button,
	Center,
	Grid,
	Text,
	TextInput,
	Textarea,
	useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";

const ContactSection = () => {
	const theme = useMantineTheme();
	const mediumScreen = useMediaQuery("(max-width: 768px)");
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [name, setName] = useState("");

	const handleSubmitForm = async () => {
		setLoading(true);

		const form = {
			sender_email: email,
			sender_name: name,
			message_body: message,
		};

		try {
			const response = await fetch(import.meta.env.VITE_APP_API_URL_EMAIL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			if (response.ok) {
				// console.log("Response:", response);
				showCompleteModal();
				setEmail("");
				setMessage("");
				setName("");
			} else {
				// const error = await response.text();
				// console.error("Error:", error);
				showErrorModal();
			}
		} catch (error) {
			// console.error("Error:", error);
			showErrorModal();
		}

		setLoading(false);
	};

	const showCompleteModal = () =>
		modals.open({
			title: "Message Sent Successfully",
			centered: true,
			children: (
				<Box>
					<Text mt="sm" mb="lg" align="center">
						{name && (
							<>
								Hi{" "}
								<Text component="span" transform="capitalize" mb="sm" fw="bold">
									{name}
								</Text>
								, <br />
							</>
						)}
						This is to inform you that your message has been sent to us
						succesfully, we will respond to your email.
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

	return (
		<Box
			mt={mediumScreen ? 100 : 150}
			mb={mediumScreen ? 50 : 100}
			id="contact"
		>
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
				{!mediumScreen && (
					<>
						You can also reach out to the developer by clicking the icons on the
						website footer.
					</>
				)}
			</Text>
			<Box>
				<Grid>
					<Grid.Col xs={12} sm={6}>
						<TextInput
							label="Your Name"
							placeholder="Enter your name"
							size={mediumScreen ? "sm" : "lg"}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid.Col>
					<Grid.Col xs={12} sm={6}>
						<TextInput
							label="Email Address"
							placeholder="Enter your email address"
							value={email}
							size={mediumScreen ? "sm" : "lg"}
							onChange={(e) => setEmail(e.target.value)}
							withAsterisk
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Textarea
							label="Your Comment"
							placeholder="Your comment"
							autosize
							size={mediumScreen ? "sm" : "lg"}
							minRows={6}
							maxRows={10}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</Grid.Col>
				</Grid>
				<div style={{ width: "100%" }}>
					<Button
						color="main.3"
						mt="md"
						fullWidth
						onClick={handleSubmitForm}
						loading={loading ? true : false}
					>
						Submit Form
					</Button>
				</div>
			</Box>
		</Box>
	);
};

export default ContactSection;
