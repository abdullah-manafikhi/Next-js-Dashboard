import Fade from "../Animation/Fade"

function SectionHeader({ children, dir }) {

  return (
    <Fade delay={0.2} duration={2}>
      <div className={` first:Fade w-fit mx-auto text-center my-16 border-b-2 border-tertiary ${dir === "ltr" ? "en_font" : "ar_font"}`}>
        <h2 className='w-48 pb-2 text-xl text-primary '>{children}</h2>
      </div>
    </Fade>
  )
}

export default SectionHeader