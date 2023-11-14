import Navbar from "../components/initalSurvery/navbar"
import SurveyForm from "../components/initalSurvery/surveryForm"
function SurveyPage() {
  return (
    <div style={styles.container}>
        <Navbar/>
        <SurveyForm />
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
}

export default SurveyPage
