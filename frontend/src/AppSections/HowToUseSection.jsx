import { Box, Center, Group, Text, createStyles } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";

const HowToUseSection = () => {
	const { classes } = useStyle();

	return (
		<Box mt={150} id="usage">
			<Center mb={35}>
				<Text
					fw="bold"
					fz={44}
					align="center"
					mb="md"
					className={classes.title}
				>
					How It Works
				</Text>
			</Center>
			<Group
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Box className={classes.stepContainer}>
					<Box className={classes.iconContainer}>
						<IconUpload color="#0E3465" />
					</Box>
					<Text my="sm" fw="bold">
						STEP 1
					</Text>
					<Text align="center">
						Select or drop your <br />
						CSV documents to upload for merge.
					</Text>
				</Box>
				<Box className={classes.stepContainer}>
					<Box className={classes.iconContainer}>
						<IconUpload color="#0E3465" />
					</Box>
					<Text my="sm" fw="bold">
						STEP 2
					</Text>
					<Text align="center">
						Once upload completes,
						<br />
						select download format type.
					</Text>
				</Box>
				<Box className={classes.stepContainer}>
					<Box className={classes.iconContainer}>
						<IconUpload color="#0E3465" />
					</Box>
					<Text my="sm" fw="bold">
						STEP 3
					</Text>
					<Text align="center">
						Click on Merge Now button
						<br /> to start merge process.
					</Text>
				</Box>
				<Box className={classes.stepContainer}>
					<Box className={classes.iconContainer}>
						<IconUpload color="#0E3465" />
					</Box>
					<Text my="sm" fw="bold">
						STEP 4
					</Text>
					<Text align="center">
						Document is downloaded <br />
						automatically once combined.
					</Text>
				</Box>
			</Group>
		</Box>
	);
};

export default HowToUseSection;

const useStyle = createStyles((theme) => ({
	iconContainer: {
		backgroundColor: theme.colors.main[1],
		borderRadius: "50%",
		width: "60px",
		height: "60px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	stepContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		borderBottom: `4px solid ${theme.colors.main[3]}`,
		width: "300px",
	},
}));
