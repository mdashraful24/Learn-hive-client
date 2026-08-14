import React from "react";

const TermsAndConditions = () => {
    return (
        <main className="container mx-auto min-h-screen mt-7 md:mt-10 mb-16 px-2 md:px-3 lg:px-2.5">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Terms & Conditions
                    </h1>

                    <p className="mt-3 text-sm">
                        Last updated: August 08, 2026
                    </p>
                </div>

                <div className="space-y-10 leading-7">
                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            1. Acceptance of Terms
                        </h2>

                        <p>
                            Welcome to LearnHive. By accessing or using LearnHive, you agree
                            to be bound by these Terms & Conditions. If you do not agree with
                            any part of these terms, please do not use the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            2. About LearnHive
                        </h2>

                        <p>
                            LearnHive is an online education and course management platform
                            that provides tools for tutors, students, and administrators to
                            manage courses, classes, schedules, educational resources,
                            enrollments, and related activities.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            3. User Accounts
                        </h2>

                        <p>
                            Some LearnHive features require you to create an account. You
                            agree to provide accurate and up-to-date information when
                            registering and to maintain the confidentiality of your account
                            credentials.
                        </p>

                        <p className="mt-3">
                            You are responsible for activities performed through your
                            account and must notify LearnHive if you suspect unauthorized
                            access.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            4. User Roles
                        </h2>

                        <p>
                            LearnHive may provide different account roles, including
                            students, tutors, and administrators. Each role may have
                            different permissions and responsibilities within the platform.
                        </p>

                        <ul className="mt-4 list-disc space-y-2 pl-6">
                            <li>
                                <strong>Students:</strong> May browse courses, enroll in
                                classes, access learning materials, and participate in
                                educational activities.
                            </li>

                            <li>
                                <strong>Tutors:</strong> May create and manage courses,
                                schedules, educational materials, and student-related
                                activities.
                            </li>

                            <li>
                                <strong>Administrators:</strong> May manage platform users,
                                courses, content, payments, and other administrative
                                operations.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            5. Course Enrollment
                        </h2>

                        <p>
                            Students may enroll in available courses through LearnHive.
                            Course availability, schedules, pricing, enrollment requirements,
                            and other conditions may vary between courses.
                        </p>

                        <p className="mt-3">
                            Enrollment does not guarantee that a particular course,
                            instructor, schedule, or learning material will remain available
                            indefinitely.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            6. Payments
                        </h2>

                        <p>
                            Certain courses or services may require payment. You agree to
                            provide accurate payment information and authorize applicable
                            charges when completing a transaction.
                        </p>

                        <p className="mt-3">
                            Payments may be processed through third-party payment providers.
                            Additional terms from the applicable payment provider may also
                            apply.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            7. Tutor Content
                        </h2>

                        <p>
                            Tutors are responsible for ensuring that the educational
                            materials they upload or publish are accurate, lawful, and do
                            not infringe the rights of others.
                        </p>

                        <p className="mt-3">
                            Tutors must not upload content that contains malicious software,
                            illegal material, unauthorized copyrighted content, or content
                            that violates the rights of other individuals.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            8. Student Responsibilities
                        </h2>

                        <p>
                            Students agree to use LearnHive for legitimate educational
                            purposes and to respect tutors, other learners, and platform
                            administrators.
                        </p>

                        <ul className="mt-4 list-disc space-y-2 pl-6">
                            <li>Do not share account credentials with others.</li>
                            <li>Do not attempt to gain unauthorized access to the platform.</li>
                            <li>Do not copy or redistribute protected course materials.</li>
                            <li>Do not upload malicious or unlawful content.</li>
                            <li>Do not misuse communication or review features.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            9. Intellectual Property
                        </h2>

                        <p>
                            LearnHive and its original platform content, including its
                            design, branding, software, interface, graphics, and other
                            materials, are protected by applicable intellectual property
                            laws.
                        </p>

                        <p className="mt-3">
                            Course materials may also belong to individual tutors or other
                            content owners. You may not reproduce, distribute, sell, or
                            commercially exploit protected content without appropriate
                            permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            10. Prohibited Activities
                        </h2>

                        <p>You agree not to:</p>

                        <ul className="mt-4 list-disc space-y-2 pl-6">
                            <li>Use LearnHive for unlawful purposes.</li>
                            <li>Attempt to compromise platform security.</li>
                            <li>Interfere with the operation of the platform.</li>
                            <li>Impersonate another person or organization.</li>
                            <li>Upload harmful, fraudulent, or malicious content.</li>
                            <li>Scrape or systematically collect platform data without permission.</li>
                            <li>Resell or commercially exploit LearnHive without authorization.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            11. Account Suspension or Termination
                        </h2>

                        <p>
                            LearnHive may suspend or terminate accounts that violate these
                            Terms & Conditions, misuse the platform, engage in fraudulent
                            activity, or otherwise create risks for users or the platform.
                        </p>

                        <p className="mt-3">
                            Users may also request account deletion, subject to applicable
                            legal, financial, and administrative requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            12. Platform Availability
                        </h2>

                        <p>
                            We aim to keep LearnHive available and reliable, but we do not
                            guarantee uninterrupted access. The platform may occasionally be
                            unavailable due to maintenance, updates, technical problems, or
                            circumstances outside our control.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            13. Third-Party Services
                        </h2>

                        <p>
                            LearnHive may integrate with third-party services such as payment
                            providers, authentication providers, hosting services, and other
                            external platforms. Your use of those services may be subject to
                            their respective terms and policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            14. Disclaimer
                        </h2>

                        <p>
                            LearnHive provides its platform on an &quot;as available&quot;
                            basis. While we strive to provide accurate and reliable
                            services, we do not guarantee that all platform content,
                            educational materials, schedules, or information will always be
                            complete, accurate, or error-free.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            15. Limitation of Liability
                        </h2>

                        <p>
                            To the extent permitted by applicable law, LearnHive shall not be
                            responsible for indirect, incidental, special, or consequential
                            losses arising from the use of or inability to use the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            16. Changes to These Terms
                        </h2>

                        <p>
                            We may modify these Terms & Conditions from time to time.
                            Continued use of LearnHive after changes become effective
                            constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            17. Contact Us
                        </h2>

                        <p>
                            If you have questions regarding these Terms & Conditions, please
                            contact the LearnHive support team.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default TermsAndConditions;
