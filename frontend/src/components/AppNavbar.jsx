import { useState } from "react";
import {
	Header,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
} from "@mantine/core";

const AppNavbar = () => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);

	return (
		<Header height={{ base: 50, md: 70 }} p="md">
			<div style={{ display: "flex", alignItems: "center", height: "100%" }}>
				<MediaQuery largerThan="sm" styles={{ display: "none" }}>
					<Burger
						opened={opened}
						onClick={() => setOpened((o) => !o)}
						size="sm"
						color={theme.colors.gray[6]}
						mr="xl"
					/>
				</MediaQuery>

				<Text fw="bold" fz={24}>
					CSVExcelCombiner
				</Text>
			</div>
		</Header>
	);
};

export default AppNavbar;
