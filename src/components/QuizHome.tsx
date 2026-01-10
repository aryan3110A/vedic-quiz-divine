import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Sparkles, Heart, Users, ScrollText, MessageCircle } from "lucide-react";
import swaminarayanBg from "@/assets/swaminarayan-bg.jpg";
import mandirLogo from "@/assets/mandir-logo.png";

interface QuizHomeProps {
  onCategorySelect: (category: string) => void;
  onQASelect: () => void;
}

const QuizHome = ({ onCategorySelect, onQASelect }: QuizHomeProps) => {
  const categories = [
    // {
    //   name: "Vachnamrut",
    //   icon: BookOpen,
    //   description: "Test your knowledge of the sacred Vachanamrut",
    //   color: "from-sacred-saffron to-divine-gold"
    // },
    {
      name: "હેતુલક્ષી પ્રશ્નો ( MCQ )",
      icon: ScrollText,
      description: "શિક્ષાપત્રીના ધર્મો અને આજ્ઞાઓનું જ્ઞાન કસો",
      color: "from-sacred-saffron to-divine-gold"
    },
    {
      name: "પ્રશ્નોત્તરી ( Q&A )",
      icon: MessageCircle,
      description: "Explore the divine teachings through questions and answers",
      color: "from-temple-maroon to-accent",
      isQA: true
    },
    // {
    //   name: "Life of Bhagwan Swaminarayan",
    //   icon: Sparkles,
    //   description: "Explore the divine life and pastimes",
    //   color: "from-temple-maroon to-accent"
    // },
    // {
    //   name: "Philosophy & Teachings",
    //   icon: Heart,
    //   description: "Understand the eternal philosophy",
    //   color: "from-primary to-secondary"
    // },
    // {
    //   name: "Saints & Sadhus",
    //   icon: Users,
    //   description: "Learn about the glory of saints",
    //   color: "from-accent to-primary"
    // }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${swaminarayanBg})`,
          filter: 'brightness(0.3) blur(2px)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header with Logo */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img 
              src={mandirLogo} 
              alt="Swaminarayan Mandir" 
              className="h-24 md:h-32 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold bg-gradient-divine bg-clip-text text-transparent mb-4">
            Jai Swaminarayan
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-inter">
            Test your spiritual knowledge through divine questions and deepen your understanding of the sacred teachings
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className="group relative overflow-hidden bg-card/50 backdrop-blur border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-divine cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => category.isQA ? onQASelect() : onCategorySelect(category.name)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <div className="relative p-6 md:p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-playfair text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground font-inter text-sm md:text-base">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6 bg-gradient-divine hover:opacity-90 transition-opacity shadow-md font-inter"
                    size="lg"
                  >
                    Start Quiz
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground font-inter text-sm">
            Answer 10 questions to test your knowledge and receive divine blessings
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizHome;
