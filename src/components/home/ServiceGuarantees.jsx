import { motion } from 'framer-motion'
import { FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa'
import '../../styles/components/home/ServiceGuarantees.css'

const ServiceGuarantees = () => {
  const guarantees = [
    {
      icon: <FaTruck />,
      title: 'FREE US DELIVERY',
      description: 'For US customers (including Alaska and Hawaii) or orders over $200.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'SECURE PAYMENT',
      description: 'We accept Visa, American Express, Paypal, Payoneer Mastercard and Discover.'
    },
    {
      icon: <FaHeadset />,
      title: 'SUPPORT 24/7',
      description: 'Contact us 24 hours a day, 7 days a week. Call Us: 0123-456-789.'
    }
  ]
  
  return (
    <div className="service-guarantees">
      <div className="guarantees-container">
        {guarantees.map((guarantee, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="guarantee-item"
          >
            <div className="guarantee-icon">
              {guarantee.icon}
            </div>
            <h3 className="guarantee-title">{guarantee.title}</h3>
            <p className="guarantee-description">{guarantee.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ServiceGuarantees
