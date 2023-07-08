import {
	ActionIcon,
	Box,
	Center,
	Group,
	Text,
	createStyles,
} from "@mantine/core";
import {
	IconBrandGithubFilled,
	IconBrandGmail,
	IconBrandLinkedin,
	IconBrandTwitterFilled,
	IconUser,
} from "@tabler/icons-react";

const useStyle = createStyles((theme) => ({
	footer: {
		background: theme.colors.dark,
		color: theme.white,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const AppFooter = () => {
	const { classes } = useStyle();

	return (
		<Box className={classes.footer} py="lg">
			<Group>
				<ActionIcon
					component="a"
					href="https://www.linkedin.com/in/danielsomade/"
					variant="transparent"
				>
					<IconUser color="white" size={24} />
				</ActionIcon>
				<ActionIcon
					component="a"
					href="https://github.com/Flexsidee"
					variant="transparent"
				>
					<IconBrandGithubFilled color="white" size={24} />
				</ActionIcon>
				<ActionIcon
					component="a"
					href="https://www.linkedin.com/in/danielsomade/"
					variant="transparent"
				>
					<IconBrandLinkedin color="white" size={24} />
				</ActionIcon>
				<ActionIcon
					component="a"
					href="https://www.linkedin.com/in/danielsomade/"
					variant="transparent"
				>
					<IconBrandTwitterFilled color="white" size={24} />
				</ActionIcon>
				<ActionIcon
					component="a"
					href="mailto:flexsidee@gmail.com"
					variant="transparent"
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
