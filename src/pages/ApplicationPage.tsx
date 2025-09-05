"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Progress } from "../components/ui/progress"
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"

const ApplicationPage: React.FC = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vertical: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [progress, setProgress] = useState(0)

  const verticals = [
    "Technology",
    "Healthcare",
    "Finance",
    "Marketing",
    "Sales",
    "Operations",
    "Human Resources",
    "Design",
    "Engineering",
    "Consulting",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.vertical) {
      newErrors.vertical = "Please select a vertical"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }

    // Update progress
    updateProgress({ ...formData, [name]: value })
  }

  const handleVerticalChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      vertical: value,
    }))

    if (errors.vertical) {
      setErrors((prev) => ({
        ...prev,
        vertical: "",
      }))
    }

    updateProgress({ ...formData, vertical: value })
  }

  const updateProgress = (data: typeof formData) => {
    let completed = 0
    if (data.name.trim()) completed += 33
    if (data.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) completed += 33
    if (data.vertical) completed += 34
    setProgress(completed)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      navigate("/dashboard")
    }, 2000)
  }

  const handleBack = () => {
    navigate("/signin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 h-auto">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold">Application Form</CardTitle>
                <CardDescription className="text-base mt-1">
                  Complete your profile to get matched with the best opportunities
                </CardDescription>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  Full Name
                  {formData.name.trim() && <CheckCircle className="w-4 h-4 text-green-500" />}
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`h-11 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <div id="name-error" className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  Email Address
                  {formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`h-11 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <div id="email-error" className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="vertical" className="text-sm font-medium flex items-center gap-2">
                  Vertical
                  {formData.vertical && <CheckCircle className="w-4 h-4 text-green-500" />}
                </Label>
                <Select value={formData.vertical} onValueChange={handleVerticalChange}>
                  <SelectTrigger
                    className={`h-11 ${errors.vertical ? "border-destructive focus:ring-destructive" : ""}`}
                    aria-describedby={errors.vertical ? "vertical-error" : undefined}
                  >
                    <SelectValue placeholder="Select your industry vertical" />
                  </SelectTrigger>
                  <SelectContent>
                    {verticals.map((vertical) => (
                      <SelectItem key={vertical} value={vertical}>
                        {vertical}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.vertical && (
                  <div id="vertical-error" className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    {errors.vertical}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={isSubmitting || progress < 100}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ApplicationPage
