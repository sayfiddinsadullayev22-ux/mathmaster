import { 
  Binary, 
  Zap, 
  SquareDot, 
  Variable, 
  Calculator, 
  Divide, 
  Equal, 
  Grid2X2, 
  Layers, 
  ArrowUpRight, 
  Activity, 
  TrendingUp, 
  LineChart, 
  Spline, 
  Triangle, 
  Square, 
  Circle 
} from 'lucide-react';

export interface Topic {
  id: number;
  title: string;
  icon: any;
  category: 'Algebra' | 'Tenglamalar' | 'Funksiya' | 'Geometriya';
  description: string;
}

export const topics: Topic[] = [
  { id: 1, title: 'Sonlar va amallar', icon: Binary, category: 'Algebra', description: 'Butun, ratsional va haqiqiy sonlar ustida amallar.' },
  { id: 2, title: 'Darajalar va xossalari', icon: Zap, category: 'Algebra', description: 'Daraja xossalari va ko\'rsatkichli ifodalar.' },
  { id: 3, title: 'Ildizli ifodalar', icon: SquareDot, category: 'Algebra', description: 'Kvadrat va n-darajali ildizlar, radikallar.' },
  { id: 4, title: 'Algebraik ifodalar', icon: Variable, category: 'Algebra', description: 'Ifodalarni soddalashtirish va shakl almashtirish.' },
  { id: 5, title: 'Qisqa ko\'paytirish', icon: Calculator, category: 'Algebra', description: 'Kvadratlar ayirmasi, yig\'indi kubi va boshqalar.' },
  { id: 6, title: 'Kasrli ifodalar', icon: Divide, category: 'Algebra', description: 'Algebraik kasrlar ustida amallar.' },
  { id: 7, title: 'Chiziqli tenglamalar', icon: Equal, category: 'Tenglamalar', description: 'Bir noma\'lumli chiziqli tenglamalar.' },
  { id: 8, title: 'Kvadrat tenglamalar', icon: Grid2X2, category: 'Tenglamalar', description: 'Diskriminant va Viyet teoremasi.' },
  { id: 9, title: 'Tenglamalar sistemasi', icon: Layers, category: 'Tenglamalar', description: 'Ikki noma\'lumli tenglamalar sistemasi.' },
  { id: 10, title: 'Tengsizliklar', icon: ArrowUpRight, category: 'Tenglamalar', description: 'Chiziqli va kvadratik tengsizliklar.' },
  { id: 11, title: 'Funksiya tushunchasi', icon: Activity, category: 'Funksiya', description: 'Aniqlanish sohasi va qiymatlar sohasi.' },
  { id: 12, title: 'Chiziqli funksiya', icon: TrendingUp, category: 'Funksiya', description: 'y = kx + b ko\'rinishidagi funksiyalar.' },
  { id: 13, title: 'Kvadratik funksiya', icon: LineChart, category: 'Funksiya', description: 'y = ax^2 + bx + c parobola xossalari.' },
  { id: 14, title: 'Funksiya grafigi', icon: Spline, category: 'Funksiya', description: 'Grafiklarni chizish va tahlil qilish.' },
  { id: 15, title: 'Uchburchaklar', icon: Triangle, category: 'Geometriya', description: 'Yuzalar, burchaklar va tomonlar xossalari.' },
  { id: 16, title: 'To\'rtburchaklar', icon: Square, category: 'Geometriya', description: 'Kvadrat, to\'g\'ri to\'rtburchak, romb.' },
  { id: 17, title: 'Doira va aylana', icon: Circle, category: 'Geometriya', description: 'Uzunlik, yuza va vatar xossalari.' },
];
