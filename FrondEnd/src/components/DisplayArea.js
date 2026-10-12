import { Carousel } from "antd";
import pic3 from "../images/pic3.jpg";
import pic4 from "../images/pic4.jpg";
import pic5 from "../images/pic5.jpg";
import pic6 from "../images/pic6.jpg";
import pic7 from "../images/pic7.jpg";

function DisplayArea() {
  return (
    <div className="displayarea">
    
    <pre><code>
        Books are a uniquely portable magic.
                                 — Stephen King
      </code>
    </pre>
      

      <Carousel autoplay>
        <div>
          <img src={pic3}/>
        </div>

        <div>
          <img src={pic4}/>
        </div>

        <div>
          <img src={pic5} />
        </div>

        <div>
          <img src={pic6} />
        </div>
        <div>
          <img src={pic7}/>
        </div>
      </Carousel>
    </div>
  );
}

export default DisplayArea;