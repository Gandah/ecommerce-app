import { AiFillInstagram, AiOutlineFacebook  } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>&copy; 2023 <Link className="attribution" href="https://www.linkedin.com/in/gandahkelvin">ganderson</Link> industires</p>
      <div className="icons">
        <Link href="#">
          <AiFillInstagram/>
        </Link>
        <Link href="#">
          <AiOutlineFacebook/>
        </Link>
        <Link href="#">
          <FaXTwitter/>
        </Link>
      </div>
    </div>
  )
}

export default Footer