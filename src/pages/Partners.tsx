import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Building, 
  Users, 
  TrendingUp, 
  Award,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Handshake,
  Target,
  CheckCircle
} from 'lucide-react';

const Partners = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [partnersRef, partnersInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const partners = [
    {
      id: 1,
      name: 'TechFix Solutions',
      category: 'Mobile Repair',
      location: 'Mumbai, Maharashtra',
      employees: '50-100',
      hiringRate: 'High',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Leading mobile repair service chain across Mumbai with 15+ outlets.',
      openings: 25,
      contact: {
        phone: '+91 98765 43210',
        email: 'hr@techfixsolutions.com'
      }
    },
    {
      id: 2,
      name: 'CoolAir Services',
      category: 'AC Servicing',
      location: 'Delhi, NCR',
      employees: '100-200',
      hiringRate: 'Very High',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Premier AC installation and servicing company serving North India.',
      openings: 40,
      contact: {
        phone: '+91 98765 43211',
        email: 'careers@coolairservices.com'
      }
    },
    {
      id: 3,
      name: 'SolarTech India',
      category: 'Solar Installation',
      location: 'Pune, Maharashtra',
      employees: '200-500',
      hiringRate: 'High',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Leading solar panel installation company with pan-India presence.',
      openings: 60,
      contact: {
        phone: '+91 98765 43212',
        email: 'jobs@solartechindia.com'
      }
    },
    {
      id: 4,
      name: 'ElectroMax',
      category: 'Electrical Services',
      location: 'Bangalore, Karnataka',
      employees: '50-100',
      hiringRate: 'High',
      logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Complete electrical solutions for residential and commercial projects.',
      openings: 30,
      contact: {
        phone: '+91 98765 43213',
        email: 'hiring@electromax.in'
      }
    },
    {
      id: 5,
      name: 'AquaFlow Systems',
      category: 'Plumbing',
      location: 'Chennai, Tamil Nadu',
      employees: '25-50',
      hiringRate: 'Medium',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Professional plumbing services for residential and commercial clients.',
      openings: 15,
      contact: {
        phone: '+91 98765 43214',
        email: 'contact@aquaflow.com'
      }
    },
    {
      id: 6,
      name: 'AutoCare Plus',
      category: 'Automotive Repair',
      location: 'Hyderabad, Telangana',
      employees: '100-200',
      hiringRate: 'Very High',
      logo: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Multi-brand automotive service centers across South India.',
      openings: 50,
      contact: {
        phone: '+91 98765 43215',
        email: 'careers@autocareplus.com'
      }
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Access to Skilled Talent',
      description: 'Get access to job-ready candidates with industry-relevant skills and practical experience.'
    },
    {
      icon: Target,
      title: 'Reduced Hiring Costs',
      description: 'Save time and money on recruitment with our pre-screened and trained candidates.'
    },
    {
      icon: TrendingUp,
      title: 'Business Growth Support',
      description: 'Scale your operations with reliable skilled workers who can contribute from day one.'
    },
    {
      icon: Handshake,
      title: 'Flexible Partnership',
      description: 'Choose from various partnership models that suit your business needs and size.'
    }
  ];

  const stats = [
    { number: '200+', label: 'Partner Companies' },
    { number: '5000+', label: 'Successful Placements' },
    { number: '85%', label: 'Average Placement Rate' },
    { number: '50+', label: 'Cities Covered' }
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
              <Building className="h-4 w-4 mr-2" />
              Trusted by 200+ Companies
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Placement Partners</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We've partnered with leading companies across India to provide direct employment 
              opportunities for our skilled graduates.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section ref={partnersRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={partnersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Companies actively hiring our skilled graduates across various vocational trades.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 50 }}
                animate={partnersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Partner Header */}
                <div className="flex items-center mb-6">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 rounded-xl object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {partner.location}
                    </div>
                  </div>
                </div>

                {/* Partner Info */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-medium text-gray-900">{partner.category}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Company Size</div>
                      <div className="font-medium text-gray-900">{partner.employees}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Current Openings</div>
                      <div className="text-2xl font-bold text-green-600">{partner.openings}+</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      partner.hiringRate === 'Very High' ? 'bg-green-100 text-green-800' :
                      partner.hiringRate === 'High' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {partner.hiringRate} Hiring
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <a
                        href={`tel:${partner.contact.phone}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                      </a>
                      <a
                        href={`mailto:${partner.contact.email}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                      View Jobs
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Partner with Kalaa?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network of successful employers who trust Kalaa for their skilled workforce needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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
              Ready to Become a Partner?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join our growing network of employers and get access to skilled, job-ready candidates. 
              Let's build a stronger workforce together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Handshake className="mr-2 h-5 w-5" />
                Partner with Us
              </button>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Call Now: +91 98765 43210
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;