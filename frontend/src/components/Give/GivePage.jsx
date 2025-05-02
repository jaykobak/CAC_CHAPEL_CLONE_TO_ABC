import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Heart,
    Church,
    Copy,
    Check,
    DollarSign,
    Gift,
    ArrowRight
} from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';
import { useToast } from '@/hooks/use-toast'


export default function GivePage() {
    const [copied, setCopied] = React.useState(false);

    const accountDetails = {
        bankName: "Polaris Bank Plc",
        accountNumber: "1017246246",
        accountName: "CHRIST APOSTOLIC CHURCH"
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountDetails.accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
            title: "Account Number Copied!",
            description: "The account number has been copied to your clipboard."
        });
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const reasons = [
        { title: "Support Ministry Work", icon: <Church className="h-5 w-5 mr-2" /> },
        { title: "Help the Needy", icon: <Heart className="h-5 w-5 mr-2" /> },
        { title: "Church Maintenance", icon: <Gift className="h-5 w-5 mr-2" /> }
    ];

    return (
        <MainLayout>
            <div className="w-full py-10 px-4 md:px-6 lg:px-8">
                <motion.div
                    className="max-w-6xl mx-auto"
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                    {/* Hero Section */}
                    <motion.div variants={item} className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="inline-block mb-4"
                        >
                            <Heart className="h-16 w-16 text-red-500 mx-auto" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Give to the Lord's Work</h1>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
                        </p>
                    </motion.div>

                    {/* Main Card */}
                    <motion.div variants={item} className="mb-16">
                        <Card className="overflow-hidden border-2 border-primary/10">
                            <CardHeader className="bg-primary/5 pb-8">
                                <CardTitle className="text-2xl md:text-3xl flex items-center justify-center">
                                    {/* <DollarSign className="h-8 w-8 mr-2 text-primary" /> */}
                                    ₦ Donation Information
                                </CardTitle>
                                <CardDescription className="text-center text-lg">
                                    Your generous contributions help us continue our mission.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                                    <div className="space-y-4 w-full md:w-1/2">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Bank Account Details:</h3>
                                            <div className="p-4 rounded-lg bg-muted">
                                                <dl className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <dt className="font-medium">Bank Name:</dt>
                                                        <dd>{accountDetails.bankName}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="font-medium">Account Name:</dt>
                                                        <dd>{accountDetails.accountName}</dd>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <dt className="font-medium">Account Number:</dt>
                                                        <dd className="font-mono bg-background px-3 py-1 rounded-md flex items-center">
                                                            {accountDetails.accountNumber}
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="ml-2"
                                                                onClick={copyToClipboard}
                                                            >
                                                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                            </Button>
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8">
                                        <h3 className="text-lg font-medium mb-4">Why Give?</h3>
                                        <ul className="space-y-4">
                                            {reasons.map((reason, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + (index * 0.2) }}
                                                    className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                                >
                                                    {reason.icon}
                                                    <span>{reason.title}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-primary/5 flex justify-center py-6">
                                <p className="text-sm text-center max-w-md">
                                    For any questions about donations or to explore other ways to give,
                                    please contact our church office.
                                </p>
                            </CardFooter>
                        </Card>
                    </motion.div>

                    {/* Giving Methods */}
                    <motion.div variants={item} className="mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Ways to Give</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "One-Time Gift",
                                    description: "Make a one-time contribution to support our church's mission and activities.",
                                    icon: <Gift className="h-8 w-8 text-primary" />
                                },
                                {
                                    title: "Regular Tithe",
                                    description: "Set up a recurring tithe to consistently support the church's ongoing ministry.",
                                    icon: <Church className="h-8 w-8 text-primary" />
                                },
                                {
                                    title: "Special Projects",
                                    description: "Contribute to specific church projects, missions work, or community initiatives.",
                                    icon: <Heart className="h-8 w-8 text-primary" />
                                }
                            ].map((method, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (index * 0.2) }}
                                >
                                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="mb-2">{method.icon}</div>
                                            <CardTitle>{method.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p>{method.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Scripture Quote */}
                    <motion.div
                        variants={item}
                        className="text-center max-w-3xl mx-auto p-8 rounded-lg bg-primary/5"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="italic text-lg"
                        >
                            "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this," says the LORD Almighty, "and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it."
                            <div className="font-medium mt-2">- Malachi 3:10</div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </MainLayout>
    );
}