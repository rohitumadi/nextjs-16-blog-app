import { Navbar } from "@/components/web/navbar"


type Props = {
    children: React.ReactNode
}
const layout = ({children}: Props) => {
  return (
    <>
    <Navbar/>
    {children}  
    </>
  )
}
export default layout