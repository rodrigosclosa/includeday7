
package com.ciandt.includeday7.backend.model;

import java.io.Serializable;
import java.util.List;

import com.google.appengine.repackaged.com.google.gson.annotations.Expose;
import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;

public class Description implements Serializable
{

    @SerializedName("captions")
    @Expose
    private List<Caption> captions = null;
    @SerializedName("tags")
    @Expose
    private List<String> tags = null;
    private final static long serialVersionUID = 6690354391072165573L;

    public List<Caption> getCaptions() {
        return captions;
    }

    public void setCaptions(List<Caption> captions) {
        this.captions = captions;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

}
