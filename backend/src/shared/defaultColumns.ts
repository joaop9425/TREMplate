import {
    AfterUpdate,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class DefaultColumns {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @AfterUpdate()
    updateDates() {
        this.updated_at = new Date();
    }
}
