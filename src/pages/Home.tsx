import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Smartphone, 
  Wind, 
  Sun, 
  Users, 
  Award, 
  TrendingUp, 
  Play,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const skills = [
    {
      icon: Smartphone,
      title: 'Mobile Repair',
      description: 'Learn advanced smartphone and tablet repair techniques',
      duration: '3 months',
      students: '500+'
    },
    {
      icon: Wind,
      title: 'AC Servicing',
      description: 'Master air conditioning installation and maintenance',
      duration: '4 months',
      students: '300+'
    },
    {
      icon: Sun,
      title: 'Solar Panel Installation',
      description: 'Become certified in renewable energy installation',
      duration: '6 months',
      students: '200+'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Students Trained' },
    { number: '85%', label: 'Placement Rate' },
    { number: '200+', label: 'Partner Companies' },
    { number: '50+', label: 'Success Stories' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Star className="h-4 w-4 mr-2" />
                  India's Leading Skills Platform
                </motion.div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Empowering Youth Through
                  <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Skills</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your future with industry-relevant vocational training. 
                  Learn high-demand skills and get connected with top employers across India.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/partners"
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                >
                  Partner with Us
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-orange-400 border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Join 5000+ students</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">4.8/5 rating</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-orange-100 rounded-3xl p-8 shadow-2xl">
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  LIVE
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mx-auto mb-4">
                    <Play className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Watch Our Intro Video</h3>
                  <p className="text-gray-600 text-center text-sm">
                    See how we're transforming lives through skill development
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
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

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Master In-Demand Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our industry-vetted courses designed to give you practical skills 
              that employers are actively seeking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{skill.title}</h3>
                <p className="text-gray-600 mb-6">{skill.description}</p>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Duration: {skill.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 text-blue-500 mr-2" />
                    {skill.students} enrolled
                  </div>
                </div>
                <Link
                  to="/courses"
                  className="block w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white text-center py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  Apply Now
                </Link>
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
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of students who have successfully launched their careers with Kalaa. 
              Your journey to financial independence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Get Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;