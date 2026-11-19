import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Star, 
  Quote, 
  MapPin, 
  Briefcase, 
  TrendingUp,
  Award,
  Users,
  Play,
  Calendar
} from 'lucide-react';

const SuccessStories = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [storiesRef, storiesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const successStories = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 24,
      course: 'Mobile Repair Technician',
      location: 'Mumbai, Maharashtra',
      previousJob: 'Unemployed',
      currentJob: 'Senior Technician at TechFix Solutions',
      salary: '₹25,000/month',
      duration: '3 months training',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'Kalaa changed my life completely. I was unemployed for 2 years, but after completing the mobile repair course, I got placed immediately. Now I earn well and support my family.',
      achievements: ['Promoted to Senior Technician in 6 months', 'Handles 50+ repairs daily', 'Training new joiners'],
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 22,
      course: 'AC Servicing & Installation',
      location: 'Delhi, NCR',
      previousJob: 'Part-time tutor',
      currentJob: 'AC Technician at CoolAir Services',
      salary: '₹30,000/month',
      duration: '4 months training',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'I never thought I could work in a technical field, but Kalaa\'s supportive environment and excellent training made it possible. I\'m now financially independent and confident.',
      achievements: ['First female technician in the company', 'Specialized in commercial AC systems', 'Customer satisfaction rate: 98%'],
      rating: 5
    },
    {
      id: 3,
      name: 'Amit Patel',
      age: 28,
      course: 'Solar Panel Installation',
      location: 'Pune, Maharashtra',
      previousJob: 'Factory worker',
      currentJob: 'Solar Installation Supervisor',
      salary: '₹40,000/month',
      duration: '6 months training',
      image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'Solar energy is the future, and Kalaa helped me become part of it. The comprehensive training and job placement support exceeded my expectations.',
      achievements: ['Leads a team of 8 technicians', 'Completed 200+ installations', 'MNRE certified trainer'],
      rating: 5
    },
    {
      id: 4,
      name: 'Sunita Devi',
      age: 26,
      course: 'Electrical Technician',
      location: 'Bangalore, Karnataka',
      previousJob: 'Domestic help',
      currentJob: 'Electrical Technician at ElectroMax',
      salary: '₹22,000/month',
      duration: '5 months training',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'From working as domestic help to becoming an electrical technician - Kalaa made this transformation possible. I\'m proud of my journey and grateful for the opportunity.',
      achievements: ['Completed 500+ wiring projects', 'Specializes in smart home systems', 'Mentor for new trainees'],
      rating: 5
    },
    {
      id: 5,
      name: 'Mohammed Ali',
      age: 25,
      course: 'Automotive Repair',
      location: 'Hyderabad, Telangana',
      previousJob: 'Street vendor',
      currentJob: 'Senior Mechanic at AutoCare Plus',
      salary: '₹35,000/month',
      duration: '8 months training',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'The automotive course at Kalaa was comprehensive and practical. The hands-on training with real vehicles prepared me well for the industry.',
      achievements: ['Certified in 5 car brands', 'Fastest diagnostic technician', 'Started own side business'],
      rating: 5
    },
    {
      id: 6,
      name: 'Kavita Singh',
      age: 23,
      course: 'Plumbing Specialist',
      location: 'Chennai, Tamil Nadu',
      previousJob: 'Retail assistant',
      currentJob: 'Plumbing Contractor',
      salary: '₹28,000/month',
      duration: '3 months training',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'Kalaa not only taught me plumbing skills but also gave me the confidence to start my own business. I now have 3 employees working with me.',
      achievements: ['Runs successful plumbing business', 'Employs 3 other Kalaa graduates', 'Specialist in modern bathroom fittings'],
      rating: 5
    }
  ];

  const impactStats = [
    { number: '5000+', label: 'Lives Transformed', description: 'Students placed in jobs' },
    { number: '₹28,000', label: 'Average Starting Salary', description: 'Monthly income' },
    { number: '85%', label: 'Placement Success Rate', description: 'Within 3 months' },
    { number: '95%', label: 'Student Satisfaction', description: 'Would recommend us' }
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
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              5000+ Success Stories
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Real Stories,
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Real Success</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Meet our graduates who transformed their lives through skill development. 
              Their journeys inspire us to continue empowering more youth across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section ref={storiesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From unemployment to financial independence - discover how our graduates 
              transformed their careers and lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                animate={storiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Profile Header */}
                <div className="flex items-center mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                    <p className="text-gray-600">{story.age} years old</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {story.location}
                    </div>
                  </div>
                </div>

                {/* Course and Job Info */}
                <div className="mb-6">
                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <div className="text-sm text-gray-600 mb-1">Course Completed</div>
                    <div className="font-semibold text-blue-800">{story.course}</div>
                    <div className="text-sm text-gray-600">{story.duration}</div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <div className="text-sm text-gray-500">Before</div>
                      <div className="font-medium text-gray-700">{story.previousJob}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Current Position</div>
                      <div className="font-medium text-gray-900">{story.currentJob}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Current Salary</div>
                      <div className="font-bold text-green-600 text-lg">{story.salary}</div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-blue-300 mb-3" />
                  <p className="text-gray-700 italic leading-relaxed">"{story.quote}"</p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {story.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">Excellent</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                    <Play className="h-4 w-4 mr-1" />
                    Watch Video
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Video Testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from our graduates about their transformation journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-200 to-orange-200 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-10 w-10 text-blue-600 ml-1" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Success Story #{item}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Watch how our graduate transformed their life through skill development
                  </p>
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
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of students who have transformed their lives through skill development. 
              Your success story could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Users className="mr-2 h-5 w-5" />
                Start Your Journey
              </button>
              <button className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200">
                <Calendar className="mr-2 h-5 w-5" />
                Book Counseling
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;