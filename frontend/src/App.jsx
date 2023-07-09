import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import AboutSection from "./AppSections/AboutSection";
import AppFooter from "./components/AppFooter";
import AppNavbar from "./AppSections/AppNavbar";
import ContactSection from "./AppSections/ContactSection";
import FAQSection from "./AppSections/FAQSection";
import HowToUseSection from "./AppSections/HowToUseSection";
import SolutionSection from "./AppSections/SolutionSection";

const App = () => {
	const mediumScreen = useMediaQuery("(max-width: 768px)");

	return (
		<>
			<AppNavbar />
			<Container size="xl" style={{ fontSize: mediumScreen ? "80%" : "100%" }}>
				<SolutionSection />
				<AboutSection />
				<HowToUseSection />
				<FAQSection />
				<ContactSection />
			</Container>
			<AppFooter />
		</>
	);
};

export default App;
