import { Container } from "@mantine/core";

import AboutSection from "./components/AboutSection";
import AppFooter from "./components/AppFooter";
import AppNavbar from "./components/AppNavbar";
import ContactSection from "./components/ContactSection";
import FAQSection from "./components/FAQSection";
import HowToUseSection from "./components/HowToUseSection";
import SolutionSection from "./components/SolutionSection";

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
