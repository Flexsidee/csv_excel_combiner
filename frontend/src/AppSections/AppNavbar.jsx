import { useState } from "react";
import {
	Box,
	Burger,
	Group,
	Text,
	MediaQuery,
	createStyles,
} from "@mantine/core";

const AppNavbar = () => {
	const { classes } = useStyle();
	const [opened, setOpened] = useState(false);

	const links = [
		{ id: 1, label: "App", link: "#app" },
		{ id: 2, label: "About", link: "#about" },
		{ id: 3, label: "Usage", link: "#usage" },
		{ id: 4, label: "FAQ", link: "#faq" },
		{ id: 5, label: "Contact", link: "#contact" },
	];

	// eslint-disable-next-line react/prop-types
	const AppNavbarLinks = ({ label, link }) => {
		return (
			<Text component="a" href={link} className={classes.links}>
				{label}
			</Text>
		);
	};

	return (
		<Box className={classes.navbar}>
			<Group p="lg" position="apart">
				<Text fw="bold" fz={24} color="main.0">
					CSVExcelCombiner
				</Text>
				<Box>
					<MediaQuery largerThan="sm" styles={{ display: "none" }}>
						<Burger
							opened={opened}
							onClick={() => setOpened((o) => !o)}
							size="md"
							color="white"
							mr="xl"
						/>
					</MediaQuery>
					<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
						<Group spacing={30}>
							{links.map((link) => (
								<AppNavbarLinks
									key={link.id}
									label={link.label}
									link={link.link}
								/>
							))}
						</Group>
					</MediaQuery>
				</Box>
			</Group>
			{opened && (
				<MediaQuery largerThan="sm" styles={{ display: "none" }}>
					<Group pb="md" pl={20}>
						{links.map((link) => (
							<AppNavbarLinks
								key={link.id}
								label={link.label}
								link={link.link}
							/>
						))}
					</Group>
				</MediaQuery>
			)}
		</Box>
	);
};

export default AppNavbar;

const useStyle = createStyles((theme) => ({
	navbar: {
		background: theme.colors.main[4],
		color: theme.colors.main[0],
	},
	links: {
		fontWeight: "bold",
		fontSize: "20px",
		color: theme.colors.main[2],

		"&:hover": {
			color: theme.colors.main[3],
		},
	},
}));
