import { Container } from "@mantine/core";

import AboutSection from "./AppSections/AboutSection";
import AppFooter from "./components/AppFooter";
import AppNavbar from "./AppSections/AppNavbar";
import ContactSection from "./AppSections/ContactSection";
import FAQSection from "./AppSections/FAQSection";
import HowToUseSection from "./AppSections/HowToUseSection";
import SolutionSection from "./AppSections/SolutionSection";

const App = () => {
	return (
		<>
			<AppNavbar />
			<Container size="xl">
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
