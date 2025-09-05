"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { CheckCircle, Clock, FileText, User, Mail, Briefcase, ArrowLeft, Download } from "lucide-react"

const DashboardPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/application")
  }

  const handleNewApplication = () => {
    navigate("/application")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 h-auto">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Application Dashboard</h1>
              <p className="text-muted-foreground mt-1">Track your recruitment progress</p>
            </div>
          </div>
          <Button onClick={handleNewApplication} className="gap-2">
            <FileText className="w-4 h-4" />
            New Application
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Application Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    Submitted
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Submitted</span>
                  <span className="text-sm font-medium">Today, 2:30 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Application ID</span>
                  <span className="text-sm font-mono">#APP-2024-001</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium">john@example.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vertical</span>
                  <Badge variant="secondary">Technology</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Application Review</p>
                    <p className="text-xs text-muted-foreground">Expected within 2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Initial Screening</p>
                    <p className="text-xs text-muted-foreground">If application is approved</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Interview Process</p>
                    <p className="text-xs text-muted-foreground">Final selection stage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Timeline */}
        <Card className="border-0 shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Application Timeline
            </CardTitle>
            <CardDescription>Track the progress of your recruitment application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Application Submitted</h4>
                  <p className="text-sm text-muted-foreground">
                    Your application has been successfully submitted and is now in our system.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Today, 2:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Under Review</h4>
                  <p className="text-sm text-muted-foreground">
                    Our recruitment team is currently reviewing your application.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Expected: Within 2-3 business days</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-muted-foreground">Initial Screening</h4>
                  <p className="text-sm text-muted-foreground">
                    If your application is approved, you'll receive an email for the next steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-muted-foreground">Interview Process</h4>
                  <p className="text-sm text-muted-foreground">
                    Final interviews with the hiring team and decision making.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Download Application
          </Button>
          <Button variant="outline" onClick={handleNewApplication}>
            Submit Another Application
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
