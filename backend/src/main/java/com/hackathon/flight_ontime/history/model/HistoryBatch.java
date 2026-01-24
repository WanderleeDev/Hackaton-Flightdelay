package com.hackathon.flight_ontime.history.model;

import com.hackathon.flight_ontime.common.model.BaseModel;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Generated;
import org.hibernate.generator.EventType;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "history_batches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HistoryBatch extends BaseModel {
    @Column(nullable = false, name = "batch_name")
    String batchName;

    @Generated(event = EventType.INSERT)
    @Column(nullable = false, name = "serial_number", updatable = false, unique = true, insertable = false)
    Integer serialNumber;

    @OneToMany(mappedBy = "batch", fetch = FetchType.LAZY)
    List<History> histories = new ArrayList<>();
}
