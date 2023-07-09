import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import App from "./App.jsx";
import { CustomFonts } from "./AppSections/CustomFont.jsx";

const theme = {
	fontFamily: "Core Sans C",
	fontFamilyMonospace: "Core Sans C",
	headings: { fontFamily: "Core Sans C" },

	components: {
		Text: {
			defaultProps: {
				color: "main.4",
			},
		},
	},

	colors: {
		main: ["#FFFFFF", "#E1F6FF", "#8ADCFF", "#14B8FF", "#0E3465", "#0E3465"],
		greey: ["#E5E5E5", "#71737A", "#4A678B"],
	},
	primaryColor: "main",
	primaryShade: 4,
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<CustomFonts />
			<ModalsProvider>
				<App />
			</ModalsProvider>
		</MantineProvider>
	</React.StrictMode>
);
