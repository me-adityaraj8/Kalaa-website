import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Smartphone, 
  Wind, 
  Sun, 
  Zap, 
  Wrench, 
  Car,
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  Calendar
} from 'lucide-react';

const Courses = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [coursesRef, coursesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const courses = [
    {
      id: 1,
      icon: Smartphone,
      title: 'Mobile Repair Technician',
      description: 'Master smartphone and tablet repair with hands-on training on latest devices and tools.',
      duration: '3 months',
      students: '500+',
      rating: 4.8,
      price: '₹15,000',
      features: [
        'Hardware & Software Troubleshooting',
        'Screen Replacement & Component Repair',
        'Water Damage Recovery',
        'Business Setup Guidance',
        'Tool Kit Included'
      ],
      level: 'Beginner to Advanced',
      certification: 'Industry Recognized Certificate',
      placement: '90% Placement Rate'
    },
    {
      id: 2,
      icon: Wind,
      title: 'AC Servicing & Installation',
      description: 'Learn complete air conditioning systems installation, maintenance, and repair techniques.',
      duration: '4 months',
      students: '300+',
      rating: 4.9,
      price: '₹18,000',
      features: [
        'Split & Window AC Repair',
        'Refrigeration Cycle Understanding',
        'Electrical Circuit Analysis',
        'Gas Charging & Leak Detection',
        'Customer Service Skills'
      ],
      level: 'Beginner to Advanced',
      certification: 'Government Approved Certificate',
      placement: '85% Placement Rate'
    },
    {
      id: 3,
      icon: Sun,
      title: 'Solar Panel Installation',
      description: 'Become certified in renewable energy with comprehensive solar panel installation training.',
      duration: '6 months',
      students: '200+',
      rating: 4.7,
      price: '₹25,000',
      features: [
        'Solar Panel System Design',
        'Grid-tied & Off-grid Systems',
        'Safety Protocols & Regulations',
        'Inverter & Battery Management',
        'Government Subsidy Guidance'
      ],
      level: 'Intermediate to Advanced',
      certification: 'MNRE Certified',
      placement: '95% Placement Rate'
    },
    {
      id: 4,
      icon: Zap,
      title: 'Electrical Technician',
      description: 'Complete electrical wiring, maintenance, and troubleshooting for residential and commercial.',
      duration: '5 months',
      students: '400+',
      rating: 4.6,
      price: '₹20,000',
      features: [
        'Electrical Wiring & Installation',
        'Motor & Control Circuit',
        'Safety Standards & Codes',
        'MCB & ELCB Understanding',
        'Power Distribution Systems'
      ],
      level: 'Beginner to Advanced',
      certification: 'ITI Equivalent Certificate',
      placement: '88% Placement Rate'
    },
    {
      id: 5,
      icon: Wrench,
      title: 'Plumbing Specialist',
      description: 'Master residential and commercial plumbing systems with modern tools and techniques.',
      duration: '3 months',
      students: '250+',
      rating: 4.5,
      price: '₹12,000',
      features: [
        'Pipe Fitting & Installation',
        'Leak Detection & Repair',
        'Bathroom & Kitchen Fixtures',
        'Water Heater Installation',
        'Drainage System Maintenance'
      ],
      level: 'Beginner to Intermediate',
      certification: 'Skill Development Certificate',
      placement: '80% Placement Rate'
    },
    {
      id: 6,
      icon: Car,
      title: 'Automotive Repair',
      description: 'Learn comprehensive vehicle maintenance and repair for two-wheelers and four-wheelers.',
      duration: '8 months',
      students: '180+',
      rating: 4.8,
      price: '₹30,000',
      features: [
        'Engine Diagnostics & Repair',
        'Brake & Suspension Systems',
        'Electrical System Troubleshooting',
        'Body Work & Painting Basics',
        'Modern Diagnostic Tools'
      ],
      level: 'Intermediate to Advanced',
      certification: 'ASDC Certified',
      placement: '92% Placement Rate'
    }
  ];

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section ref={headerRef} className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              Industry-Recognized Courses
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Career Path</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our comprehensive vocational training programs designed to give you 
              practical skills and real-world experience that employers value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Hands-on Training
              </div>
              <div className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Job Placement Support
              </div>
              <div className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Industry Certification
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section ref={coursesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={coursesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                {/* Course Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <course.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-600">{course.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">{course.students} enrolled</div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-green-500" />
                      {course.placement}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What You'll Learn:</h4>
                  <ul className="space-y-2">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Course Details */}
                <div className="border-t pt-4 mb-6">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Level:</span>
                      <span className="font-medium text-gray-700">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Certification:</span>
                      <span className="font-medium text-gray-700">Yes</span>
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{course.price}</div>
                    <div className="text-sm text-gray-500">One-time payment</div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our counselors are here to help you choose the right course for your career goals. 
              Get personalized guidance and start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </button>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Call Now: +91 98765 XXXX
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;