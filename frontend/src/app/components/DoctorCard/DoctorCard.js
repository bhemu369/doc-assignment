import React from 'react';
import styles from './DoctorCard.module.css';

const DoctorCard = ({ doctor }) => {
    return (
        <div className={styles.doctorCard}>
            <div className={styles.doctorInfo}>
                <div className={styles.doctorImageContainer}>
                    <img
                        src={doctor.imageUrl || '/doctor-placeholder.png'}
                        alt={doctor.name}
                        className={styles.doctorImage}
                    />
                </div>

                <div className={styles.doctorDetails}>
                    <h3 className={styles.doctorName}>{doctor.name}</h3>
                    <p className={styles.doctorSpecialty}>{doctor.specialization}</p>
                    <div className={styles.doctorMeta}>
                        <span className={styles.doctorExperience}>{doctor.experience} Years</span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.doctorQualifications}>
                            {doctor.qualifications.join(', ')}
                        </span>
                    </div>
                    <p className={styles.doctorLocation}>{doctor.location.city}, {doctor.location.state}</p>
                    <p className={styles.doctorClinic}>{doctor.clinic}</p>

                    {doctor.rating > 0 && (
                        <div className={styles.ratingContainer}>
                            <span className={styles.ratingValue}>{doctor.rating}%</span>
                            {doctor.patientCount > 0 && (
                                <span className={styles.patientCount}>({doctor.patientCount}+ Patients)</span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.doctorActions}>
                <div className={styles.priceSection}>
                    <span className={styles.price}>₹{doctor.price}</span>
                    {doctor.cashback > 0 && (
                        <span className={styles.cashback}>₹{doctor.cashback} Cashback</span>
                    )}
                </div>

                <button className={styles.consultButton}>
                    Consult Online
                </button>

                {doctor.availableTime && (
                    <div className={styles.availabilityInfo}>
                        {doctor.isOnline
                            ? `Available in ${doctor.availableTime}`
                            : `Available at ${doctor.availableTime}`
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorCard; 