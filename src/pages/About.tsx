// import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Target, 
  Eye, 
  Users, 
  Award, 
  Heart,
  TrendingUp,
  Lightbulb,
  Shield,
  Globe,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const teamMembers = [
    {
      name: 'Sarvagya Dwivedi',
      position: 'CEO',
      image: 'src/components/sarvagya.jpeg',
      bio: 'The visionary behind the idea. A bold thinker with a heart for change, Sarvagya drives the mission with clarity and passion..',
      expertise: ['Education Technology', 'Skill Development', 'Policy Making']
    },
    {
      name: 'K Aditya Raj Kumar Dora',
      position: 'CTO',
      image: 'src/components/adi.jpeg',
      bio: 'The tech brain. Always innovating, ensuring our solutions are smart, scalable, and future-ready.',
      expertise: ['Curriculum Design', 'Technical Support', 'Quality Assurance']
    },
    {
      name: 'Atyadik',
      position: 'CFO',
      image: 'src/components/anand.jpeg',
      bio: 'Corporate relations expert with strong industry connections across India.',
      expertise: ['Industry Relations', 'Career Counseling', 'Financial Planning']
    },
    {
      name: 'Abhinav',
      position: 'COO',
      image: 'src/components/abhinav.jpeg',
      bio: 'Operations management specialist ensuring seamless program delivery.',
      expertise: ['Operations Management', 'Process Optimization', 'Job Placement']
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'We believe in empowering individuals with practical skills that create lasting career opportunities.'
    },
    {
      icon: Shield,
      title: 'Quality',
      description: 'We maintain the highest standards in training, ensuring our students receive world-class education.'
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'We welcome students from all backgrounds, providing equal opportunities for skill development.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously innovate our teaching methods and curriculum to stay relevant with industry needs.'
    },
    {
      icon: Globe,
      title: 'Impact',
      description: 'We measure our success by the positive impact we create in communities across India.'
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from training delivery to placement support.'
    }
  ];

  const milestones = [
    { year: 'December 2024', event: 'Identified the growing unemployment challenge in Bihar and envisioned Kalaa — a startup to empower youth with hands-on, job-ready skills.' },
    { year: 'March 2025', event: 'Pitched the idea to senior government officials and successfully received funding under the Startup Bihar Scheme, selected from 1000+ applicants.' },
    { year: 'April 2025', event: 'Formed partnerships with local businesses to provide on-ground training and implemented a revenue-sharing model, making Kalaa a self-sustaining impact platform.' },
    { year: 'May 2025', event: 'Launched certified courses in high-demand trades like mobile repair, AC installation, and solar maintenance.' },
    { year: '2025', event: 'Expanding to 25 cities, targeting 10,000 graduates this year' }
  ];

  const impactNumbers = [
    { number: '5000+', label: 'Students Trained' },
    { number: '200+', label: 'Partner Companies' },
    { number: '25', label: 'Training Centers' },
    { number: '85%', label: 'Placement Rate' }
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
              <Target className="h-4 w-4 mr-2" />
              Transforming Lives Since 2025
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Kalaa</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We are India's leading skills development platform, dedicated to bridging the gap 
              between unemployment and opportunity through practical vocational training.
            </p>
          </motion.div>

          {/* Impact Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {impactNumbers.map((stat, index) => (
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

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-xl mr-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To empower unemployed and underemployed youth across India with industry-relevant 
                  vocational skills, creating pathways to sustainable employment and entrepreneurship 
                  opportunities that transform lives and strengthen communities.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-orange-500 to-blue-600 p-3 rounded-xl mr-4">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To become India's most trusted and comprehensive skills development platform, 
                  creating a skilled workforce that drives economic growth while ensuring no 
                  youth is left behind in the journey toward financial independence.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why We Exist</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Skills Gap Challenge</h4>
                    <p className="text-gray-600">Bridging the gap between available jobs and skilled workforce in India.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Youth Unemployment</h4>
                    <p className="text-gray-600">Addressing the challenge of youth unemployment through practical skill training.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Economic Growth</h4>
                    <p className="text-gray-600">Contributing to India's economic growth by creating a skilled workforce.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Social Impact</h4>
                    <p className="text-gray-600">Creating positive social change by transforming individual lives and communities.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our approach to skill development and education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-4">{value.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who are leading Kalaa's mission to transform 
              vocational education in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="space-y-1">
                  {member.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mr-1 mb-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small vision to a nationwide impact - discover our milestones and achievements.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                        {milestone.year}
                      </div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full z-10">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
              Join Our Mission
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Be part of India's skill development revolution. Whether you're looking to learn, 
              teach, or partner with us, there's a place for you in our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
                <Users className="mr-2 h-5 w-5" />
                Join as Student
              </button>
              <button className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-200">
                <Award className="mr-2 h-5 w-5" />
                Become a Partner
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;