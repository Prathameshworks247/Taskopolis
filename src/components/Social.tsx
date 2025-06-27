import insta from "../assets/icons/insta.png"
import link from "../assets/icons/link.png"
import twit from "../assets/icons/X.png"
function Social() {
  return (
    <div className='d-flex justify-content-center align-items-center' style = {{gap: '50px'}}>
        <a href="https://www.instagram.com/__prathamesh10___/"><img src={insta} alt="" style={{ width: '60px', height: 'auto' }}/></a>
        <a href="https://x.com/Pure_prathamesh"><img src={twit} alt="" style={{ width: '60px', height: 'auto' }}/></a>
        <a href="https://www.linkedin.com/in/prathamesh-patil-815668279/"><img src={link} alt="" style={{ width: '60px', height: 'auto' }}/></a>
    </div>
  )
}

export default Social;