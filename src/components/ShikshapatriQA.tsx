import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, ScrollText, MessageCircle } from "lucide-react";
import { shikshapatriQA } from "@/data/shikshapatriQA";
import swaminarayanBg from "@/assets/swaminarayan-bg.jpg";
import mandirLogo from "@/assets/mandir-logo.png";

interface ShikshapatriQAProps {
  onHome: () => void;
}

const ShikshapatriQA = ({ onHome }: ShikshapatriQAProps) => {
  return (
    <div className="min-h-screen h-screen relative overflow-hidden flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${swaminarayanBg})`,
          filter: 'brightness(0.3) blur(2px)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />

      {/* Fixed Header */}
      <div className="relative z-10 flex-shrink-0">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 ">
            <div className="flex items-center space-x-4">
              <img src={mandirLogo} alt="Logo" className="h-12 w-auto opacity-80" />
              <span className="font-playfair text-xl md:text-2xl font-semibold bg-gradient-divine bg-clip-text text-transparent">
                Jai Swaminarayan
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onHome}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </div>

          {/* Title */}
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-divine shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                Q&A Shikshapatri
              </h1>
            </div>
            <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
              Explore the divine teachings of Shikshapatri through these frequently asked questions and answers.
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Q&A Section */}
      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="container mx-auto px-4 pb-8">
          {/* Q&A Accordion */}
          <Card className="bg-card/80 backdrop-blur border-2 border-border shadow-card max-w-4xl mx-auto overflow-hidden animate-scale-in">
            <div className="p-6 md:p-8">
              <Accordion type="multiple" className="w-full">
                {shikshapatriQA.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`} className="border-b border-border/50 last:border-0">
                    <AccordionTrigger className="text-left font-playfair text-lg md:text-xl font-semibold hover:text-primary transition-colors py-4">
                      <div className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm mt-0.5">
                          {item.id}
                        </span>
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="font-inter text-muted-foreground text-base md:text-lg leading-relaxed pb-6 pl-12 pr-4">
                      <div className="p-4 rounded-lg bg-primary/5 border-l-4 border-primary">
                        <p className="text-foreground font-semibold mb-1">Answer:</p>
                        {item.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="font-playfair text-2xl font-bold bg-gradient-divine bg-clip-text text-transparent">
              Jai Swaminarayan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShikshapatriQA;
