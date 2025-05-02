import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MainPadding from '../../layouts/MainPadding';
import HeadingText from '../HeadingText';

const Counter = ({ value, title, icon }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000; // animation duration in ms
            const end = parseInt(value);
            const incrementTime = Math.floor(duration / end);

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= end) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            className="flex flex-col items-center text-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <div className="text-primary text-4xl">{icon}</div>
            <motion.h2
                className="text-5xl font-bold text-foreground/90 font-cinzel"
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: [0.8, 1.2, 1] } : {}}
                transition={{ duration: 0.8, times: [0, 0.5, 1] }}
            >
                {count}+
            </motion.h2>
            <h3 className="text-lg font-medium text-foreground/80">{title}</h3>
        </motion.div>
    );
};

const AnimatedCounter = () => {
    const stats = [
        { value: "20", title: "Years of Service", icon: "🏛️" },
        { value: "1000", title: "Members", icon: "👨‍👩‍👧‍👦" },
        { value: "250", title: "Sermons Delivered", icon: "📚" },
    ];

    return (
        <MainPadding>
            <div className="py-16 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute -right-20 top-10 w-40 h-40 rounded-full bg-primary/5 z-0"></div>
                <div className="absolute -left-10 bottom-10 w-20 h-20 rounded-full bg-orange/10 z-0"></div>

                <motion.div
                    className="flex flex-col gap-8 items-center relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="text-center mb-6">
                        <h3 className="text-primary font-bold tracking-wider mb-2">OUR IMPACT</h3>
                        <HeadingText className="text-3xl md:text-4xl font-cinzel">
                            GROWING TOGETHER IN FAITH AND COMMUNITY
                        </HeadingText>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl bg-white/50 p-10 rounded-xl shadow-lg">
                        {stats.map((stat, index) => (
                            <Counter key={index} {...stat} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </MainPadding>
    );
};

export default AnimatedCounter;