"use client"
import Button from "@/components/ui/Button";
import {useRouter} from "next/navigation";

const Greeting = () => {
    const router = useRouter();
    return (
        <section className='grid grid-rows-3 mt-[8.5vw] mr-[15vw] ml-[14.5vw] px-[2vw]'>
            <div className='flex flex-row justify-center text-[5vw]'>YU-RI</div>
            <div className='flex flex-row justify-start text-[2vw]'>Ваш личный ассистент <br/>
                по юридическим вопросам</div>
            <div className='flex flex-row justify-end'>
                <Button onClick={() => router.push('/login')}>ПОПРОБОВАТЬ БЕСПЛАТНО</Button>
            </div>
        </section>
    )
}

export default Greeting;