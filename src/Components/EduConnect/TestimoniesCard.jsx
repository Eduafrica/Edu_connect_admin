import { useState } from "react"
import { menuOption } from "../../Data/menu"
import MenuList from "../Helpers/MenuList"

function TestimoniesCard() {
    const data = menuOption

    const [ activeCard, setActiveCard ] = useState(data[0].slug)

    const handleCardChange = (value) => {
        setActiveCard(value)
    }

  return (
    <div>
      <MenuList data={data} activeCard={activeCard} onCLick={handleCardChange} />
    </div>
  )
}

export default TestimoniesCard
