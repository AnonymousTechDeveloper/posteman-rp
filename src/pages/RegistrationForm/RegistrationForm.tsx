import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Users, Send, CheckCircle } from "lucide-react";

const VERTICALS = [
  { id: "ai-ml", label: "AI/ML", description: "Artificial Intelligence & Machine Learning" },
  { id: "neurotech", label: "NeuroTech", description: "Neurotechnology & Brain-Computer Interfaces" },
  { id: "frontend", label: "Frontend", description: "Frontend Development & UI/UX" },
  { id: "backend", label: "Backend", description: "Backend Development & APIs" },
  { id: "design", label: "Design", description: "Product Design & User Experience" },
  { id: "gamedev", label: "Game Dev", description: "Game Development & Interactive Media" },
  { id: "events", label: "Events", description: "Event Management & Coordination" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  verticals: string[];
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  verticals?: string;
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    verticals: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Verticals validation
    if (formData.verticals.length === 0) {
      newErrors.verticals = "Please select at least one vertical";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerticalChange = (verticalId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      verticals: checked
        ? [...prev.verticals, verticalId]
        : prev.verticals.filter(id => id !== verticalId)
    }));

    // Clear verticals error when user selects something
    if (checked && errors.verticals) {
      setErrors(prev => ({ ...prev, verticals: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store user data in localStorage for demo
    localStorage.setItem("userData", JSON.stringify(formData));

    toast({
      title: "Registration Successful!",
      description: "Welcome to RecruitPortal. Redirecting to your dashboard...",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-orange">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Join RecruitPortal</h1>
          <p className="text-gray-400 mt-2">Tell us about yourself and your interests</p>
        </div>

        {/* Registration Form */}
        <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Registration Details</CardTitle>
            <CardDescription className="text-gray-400">
              Fill in your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  className={`bg-brand-gray border-brand-gray-light text-white placeholder:text-gray-400 focus:border-primary ${errors.name ? "border-destructive focus:border-destructive" : ""
                    }`}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address <span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={`bg-brand-gray border-brand-gray-light text-white placeholder:text-gray-400 focus:border-primary ${errors.email ? "border-destructive focus:border-destructive" : ""
                    }`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number <span className="text-primary">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  className={`bg-brand-gray border-brand-gray-light text-white placeholder:text-gray-400 focus:border-primary ${errors.phone ? "border-destructive focus:border-destructive" : ""
                    }`}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-destructive" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Verticals Selection */}
              <div className="space-y-4">
                <div>
                  <Label className="text-white text-base">
                    Interested Verticals <span className="text-primary">*</span>
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">
                    Select all areas that interest you
                  </p>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  role="group"
                  aria-labelledby="verticals-label"
                  aria-describedby={errors.verticals ? "verticals-error" : undefined}
                >
                  {VERTICALS.map((vertical) => (
                    <div
                      key={vertical.id}
                      className={`flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200 hover:bg-brand-gray/50 ${formData.verticals.includes(vertical.id)
                        ? "border-primary bg-primary/10"
                        : "border-brand-gray-light"
                        }`}
                    >
                      <Checkbox
                        id={vertical.id}
                        checked={formData.verticals.includes(vertical.id)}
                        onCheckedChange={(checked) =>
                          handleVerticalChange(vertical.id, checked === true)
                        }
                        className="mt-0.5"
                        aria-describedby={`${vertical.id}-description`}
                      />
                      <div className="space-y-1 flex-1">
                        <Label
                          htmlFor={vertical.id}
                          className="text-white font-medium cursor-pointer"
                        >
                          {vertical.label}
                          {formData.verticals.includes(vertical.id) && (
                            <CheckCircle className="inline-block ml-2 h-4 w-4 text-primary" />
                          )}
                        </Label>
                        <p
                          id={`${vertical.id}-description`}
                          className="text-sm text-gray-400"
                        >
                          {vertical.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {errors.verticals && (
                  <p id="verticals-error" className="text-sm text-destructive" role="alert">
                    {errors.verticals}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:bg-brand-orange-dark text-white shadow-orange transition-all duration-300 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;