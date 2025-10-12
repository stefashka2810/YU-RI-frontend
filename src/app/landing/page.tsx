import Greeting from "@/components/landing/greeting/Greeting";
import AboutContent from "@/components/landing/aboutContent/AboutContent";
import AboutUsage from "@/components/landing/aboutUsage/AboutUsage";
import AdditionalInfo from "@/components/landing/additionalInfo/AdditionalInfo";
import AboutPrices from "@/components/landing/aboutPrices/AboutPrices";
import QuestionSection from "@/components/landing/questionSection/QuestionSection";

const LandingPage = () => {
    return (
        <>
            <Greeting />
            <AboutContent/>
            <AboutUsage/>
            <AdditionalInfo/>
            <AboutPrices/>
            <QuestionSection/>

        </>
    )
}

export default LandingPage;