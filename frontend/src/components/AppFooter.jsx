import { ActionIcon, Box, Group, Text, createStyles } from "@mantine/core";
import {
	IconBrandGithubFilled,
	IconBrandGmail,
	IconBrandLinkedin,
	IconBrandTwitterFilled,
	IconWorldWww,
} from "@tabler/icons-react";

const AppFooter = () => {
	const { classes } = useStyle();

	return (
		<Box className={classes.footer} py="lg">
			<Group>
				<ActionIcon
					component="a"
					href="https://somadedaniel.netlify.app/"
					variant="transparent"
					target="_blank"
				>
					<IconWorldWww color="white" size={24} />
				</ActionIcon>
				<ActionIcon
					component="a"
					href="https://github.com/Flexsidee"
					variant="transparent"
					target="_blank"
				>
					<IconBrandGithubFilled color="white" size={24} />
				</ActionIcon>
				<ActionIcon
					component="a"
					href="https://www.linkedin.com/in/danielsomade/"
					variant="transparent"
					target="_blank"
				>
					<IconBrandLinkedin color="white" size={24} />
				</ActionIcon>
				<ActionIcon
					component="a"
					href="https://www.linkedin.com/in/danielsomade/"
					variant="transparent"
					target="_blank"
				>
					<IconBrandTwitterFilled color="white" size={24} />
				</ActionIcon>
				<ActionIcon
					component="a"
					href="mailto:flexsidee@gmail.com"
					variant="transparent"
					target="_blank"
				>
					<IconBrandGmail color="white" size={24} />
				</ActionIcon>
			</Group>
			<Text mt="lg" fw="bold" color="gray">
				Developed by Daniel Somade
			</Text>
		</Box>
	);
};

export default AppFooter;

const useStyle = createStyles((theme) => ({
	footer: {
		background: theme.colors.main[4],
		color: theme.colors.main[0],
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
}));
