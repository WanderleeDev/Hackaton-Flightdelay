package com.hackathon.flight_ontime.history.model;

import com.hackathon.flight_ontime.common.model.BaseModel;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "history_batches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HistoryBatch extends BaseModel {
    @Column(nullable = false, name = "batch_name")
    String batchName;

    @Column(nullable = false, name = "serial_number", updatable = false, unique = true)
    Integer seralNumber;
}
