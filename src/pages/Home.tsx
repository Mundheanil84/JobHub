import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-background container mx-auto px-4 py-8">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Redefine Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Career Destiny
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Harness the power of AI to unlock opportunities that resonate with
              your unique skills and aspirations.
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              onClick={() => navigate("/jobs")}
            >
              Explore Opportunities <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "AI-Powered Matching",
                desc: "Our quantum algorithms decode your career DNA",
              },
              {
                icon: Users,
                title: "Elite Network",
                desc: "Connect with visionaries and industry titans",
              },
              {
                icon: TrendingUp,
                title: "Future-Proof Skills",
                desc: "Stay ahead with predictive skill forecasting",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
              >
                <feature.icon className="h-10 w-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900 opacity-10 transform -skew-y-6" />
        <div className="container mx-auto px-4 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Trending Ecosystems
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Quantum Computing", count: "2,500+" },
              { name: "Biotech Revolution", count: "1,800+" },
              { name: "AI Ethics", count: "3,200+" },
              { name: "Space Exploration", count: "900+" },
              { name: "Sustainable Energy", count: "4,100+" },
              { name: "Cybersecurity", count: "5,000+" },
              { name: "Historical Archaeology", count: "700+" },
              { name: "Robotic Process Automation", count: "2,300+" },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="font-semibold text-purple-400">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {category.count} opportunities
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transcend?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the vanguard of professionals shaping the future. Your
            extraordinary journey begins here.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/jobs")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 rounded-full px-8 py-6 text-lg"
          >
            Ignite Your Potential <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  );
}
