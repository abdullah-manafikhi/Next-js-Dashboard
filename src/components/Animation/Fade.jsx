import { motion } from "framer-motion"

function Fade({ children, delay, duration }) {

    const variants = {
        offscreen: {
            opacity: 0,
        },
        onscreen: {
            width:"100%",
            opacity: 1,
        }
    }

    return (
        <motion.div 
            variants={variants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            transition={{duration: duration, delay: delay}}
        >
            {children}
        </motion.div>
    )
}

export default Fade