import { useState } from "react";
import { Burger, Group, Text, MediaQuery, createStyles } from "@mantine/core";

const AppNavbar = () => {
	const { classes } = useStyle();
	const [opened, setOpened] = useState(false);

	return (
		<Group p="lg" position="apart" className={classes.navbar}>
			<MediaQuery largerThan="sm" styles={{ display: "none" }}>
				<Burger
					opened={opened}
					onClick={() => setOpened((o) => !o)}
					size="sm"
					color="grey[6]"
					mr="xl"
				/>
			</MediaQuery>
			<Text fw="bold" fz={24} color="main.0">
				CSVExcelCombiner
			</Text>
			<Group spacing={30}>
				<Text component="a" href="#app" className={classes.links}>
					App
				</Text>
				<Text component="a" href="#about" className={classes.links}>
					About
				</Text>
				<Text component="a" href="#usage" className={classes.links}>
					Usage
				</Text>
				<Text component="a" href="#faq" className={classes.links}>
					FAQ
				</Text>
				<Text component="a" href="#contact" className={classes.links}>
					Contact
				</Text>
			</Group>
		</Group>
	);
};

export default AppNavbar;

const useStyle = createStyles((theme) => ({
	navbar: {
		background: theme.colors.main[4],
		color: theme.colors.main[0],
		marginBottom: "40px",
	},
	links: {
		fontWeight: "bold",
		fontSize: "20px",
		color: theme.colors.main[0],

		"&:hover": {
			color: theme.colors.main[3],
		},
	},
}));
