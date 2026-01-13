import beauty from "../images/beauty.png";
import electrician from "../images/electritian.png";
import lawyer from "../images/lawyer.png";
import trainer from "../images/fitness.png";
import carpenter from "../images/carpenter.png"
import cleaning from "../images/cleaning.png";
import plumber from "../images/plumber.png";
import tution from "../images/tution.png"

export const categories = [
  { group: 'Home Services', items: [{ name: 'Plumbing', slug: 'plumbing' , imag:plumber},{ name: 'Electrician', slug: 'electrician' , imag:electrician},{ name: 'Cleaning', slug: 'cleaning'  , imag:cleaning},{ name: 'Carpentry', slug: 'carpentry' , imag : carpenter}] },
  { group: 'Personal Services', items: [{ name: 'Beauty', slug: 'beauty' ,imag:beauty },{ name: 'Fitness Trainer', slug: 'fitness'  , imag:trainer},{ name: 'Tutor', slug: 'tutor' , imag:tution }] },
  { group: 'Professional Services', items: [{ name: 'Accountant', slug: 'accountant'  , imag:''},{ name: 'Lawyer', slug: 'lawyer' , imag:lawyer },{ name: 'Designer', slug: 'designer' ,  imag:''}] },
];
