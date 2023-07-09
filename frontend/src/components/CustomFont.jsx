import { Global } from "@mantine/core";
import font from "../assets/font/CoreSansC-45Regular.ttf";

export function CustomFonts() {
	return (
		<Global
			styles={[
				{
					"@font-face": {
						fontFamily: "Core Sans C",
						src: `url('${font}')`,
						fontWeight: 400,
						fontStyle: "normal",
					},
				},
			]}
		/>
	);
}
