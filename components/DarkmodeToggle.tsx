'use client';

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export default function DarkmodeToggle()
{
  const [darkmode, setDarkmode] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('darkmode') ;
    const savedDarkmode = (storedData == null || storedData == undefined) ? true : storedData === 'true';
    setDarkmode(savedDarkmode);
    document.body.classList.toggle('dark', savedDarkmode);
  }, []);

  const toggleClick = () => {
    setDarkmode(!darkmode);
    document.body.classList.toggle('dark', !darkmode);
    localStorage.setItem('darkmode', !darkmode ? 'true' : 'false');
  }

  return (
    <Button onClick={toggleClick} size="icon" variant="ghost" className="my-0"> 
      {darkmode ? (
        <MoonIcon size="24" />
      ) : (
        <SunIcon size="24" />
      )}
    </Button>
  )
}